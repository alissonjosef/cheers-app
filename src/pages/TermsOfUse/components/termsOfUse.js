import React from 'react';
import { FlatList } from 'react-native';
import { termsOfUseData } from './data';

import Header from './termsHeader';
import Pages from './termsPages';
import FooterTerms from './termsFooter';


const Terms = () => {

    const headerComponent = () => {
        return <Header/> 
    }

    const pagesRender = (item) => {
        return <Pages {...item}/> 
    }

    return (
        <FlatList
            keyExtractor={data => data.idPage}
            data={termsOfUseData}
            ListHeaderComponent={headerComponent}
            renderItem={pagesRender}
            ListFooterComponent={()=> <FooterTerms/>}
            ListHeaderComponentStyle={{flex:1}}
        />
    );



}

export default Terms;