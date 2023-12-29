import { gql, ApolloError } from 'apollo-server';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

import User from '../../models/User';
import { de } from 'date-fns/locale';

export const typeDefs = gql`
  input CreateUserInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    createUser(user: CreateUserInput): User
  }
`;

class UsernameTakenError extends ApolloError {
  constructor(message, properties) {
    super(message, 'USERNAME_TAKEN', properties);
  }

  static fromUsername(username) {
    return new UsernameTakenError(
      `Username ${username} is already taken. Choose another username`,
      { username },
    );
  }
}

const argsSchema = yup.object().shape({
  user: yup.object().shape({
    username: yup.string().min(1).max(30).lowercase().trim(),
    password: yup.string().min(5).max(50).trim(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  }),
});

const createPasswordHash = (password) => bcrypt.hash(password, 10);

export const resolvers = {
  Mutation: {
    createUser: async (obj, args) => {
      const {
        user: { password, username, confirmPassword, ...user },
      } = await argsSchema.validate(args, {
        stripUnknown: true,
      });

      delete user.confirmPassword;

      const passwordHash = await createPasswordHash(password);

      const existingUser = await User.query().findOne({
        username,
      });

      if (existingUser) {
        throw UsernameTakenError.fromUsername(username);
      }

      return User.query().insertAndFetch({
        ...user,
        username,
        password: passwordHash,
        id: uuid(),
      });
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
