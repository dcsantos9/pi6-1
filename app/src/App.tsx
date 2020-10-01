import React from 'react';
import { View , StatusBar} from 'react-native';

const App: React.FC = () => ( 
    <>
        <StatusBar barStyle="light-content" backgroundColor="#eeeeee" />
        <View style={{ flex: 1, backgroundColor: '#eeeeee' }}/>
    </>
 );
 
 export default App;