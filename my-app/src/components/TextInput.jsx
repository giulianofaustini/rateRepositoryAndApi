import { TextInput as NativeTextInput } from 'react-native';



export const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style,
    {
        borderColor: error ? '#d73a4a' : 'grey',
      },
    ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

