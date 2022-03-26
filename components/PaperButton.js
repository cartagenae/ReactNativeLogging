import React from 'react';
import { Button } from 'react-native-paper';

const PaperButton = (props) => {
  return (
    <Button>
      { ...props }
    </Button>
  )
}
