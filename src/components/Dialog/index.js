import * as React from 'react';
import {Provider,Button, Dialog, Portal,Paragraph} from 'react-native-paper';

const DialogModal = ({setVisible,visible,text}) => {
 
  const hideDialog = () => setVisible(false);

  return (
    <Provider>
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                <Paragraph>{text}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={hideDialog}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </Provider>
   
  );
};

export default DialogModal;