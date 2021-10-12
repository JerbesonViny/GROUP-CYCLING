import React, { useRef, useState, useEffect } from 'react'
import {View, StatusBar, TouchableOpacity, FlatList, Button as Buttons, Pressable} from 'react-native'
import {Title, ImageBackground as Box, Text, Spacer, Cover, Button} from './styles'
import { COLORS, SIZES } from './theme'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../../../assets/background.png'
import tour01 from '../../../assets/UNDRAWIMAGE.png';
import tour02 from '../../../assets/UNDRAWIMAGE02.png';
import tour03 from '../../../assets/UNDRAWIMAGE03.png';
import tour04 from '../../../assets/UNDRAWIMAGE04.png';
import tour05 from '../../../assets/UNDRAWTEST.png'
import tour06 from '../../../assets/UNDRAWS2.png'



const HelpScreen = ({navigation}) => {

  const HelpTour = [
    {
        _id: '1',
        bg: 'blue',
        button: 'blue',
        title: `  VIVA.
  SONHE E
  ALCANCE!


        `,
        titledesc: `  PEDALE.`,
        textinit: 'Pensamos em um serviço perfeito para você construir novas amizades, se divertir e praticar exercício físico.',
        image: tour01
    },
    {
        _id: '2',
        bg: 'blue',
        button: 'blue',
        titlemap: `  MAPA`,
        text: 'O Mapa tem uma função que permite o usúario cadastrar e localizar pedais próximos a sua localização.',
        image: tour02
    },
    {
        _id: '3',
        bg: 'blue',
        button: 'blue',
        titleperfil: `  PERFIL `,
        text: 'O usúario pode modificar o seu perfil, colocando dados que serão exibidos aos demais utilizadores do APP.',
        image: tour03
    },
    {
        _id: '4',
        bg: 'blue',
        button: 'blue',
        titlenet: `  NET
  CYCLING`,
        textnet: `O NET Cycling é uma rede social online de compartilhamento de fotos e vídeos entre seus usuários.`,
        img: tour06
    },
  ];

  const flatlistRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setviewableItems] = useState([])

  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    setviewableItems(viewableItems)
  });

     useEffect(() => {
        if(!viewableItems[0] || currentPage === viewableItems[0].index)
            return;
        setCurrentPage(viewableItems[0].index)


  }, [viewableItems])

  const verifyTokenExists = async() => {
    if( await AsyncStorage.getItem("token") ) {
      
      navigation.reset({
        index: 0,
        routes: [{name:"Principal"}] 
      })
    }
  }

  const GoToLogin = async () => {
    await AsyncStorage.setItem('@tour', 'Y');
    navigation.navigate('Signin')
  };

  const handleNext = () => {
    if(currentPage == HelpTour.length-1) {
      GoToLogin();
      return;
    };

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage +1,

     });
  }

  const handleBack = () => {
    if(currentPage == HelpTour.length-1)
      return;

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage -1,

     })
  }

  const handleSkip = () => {
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: HelpTour.length -1,
    })
  }

  const renderTopSection = () => {
    return(
    <TouchableOpacity onPress={handleSkip}  style={{ alignSelf : "flex-end", top: 40, right: 20}}>
      <Text  style={{opacity: currentPage == HelpTour.length-1 ? 0 : 1}} color='light'>Pular</Text>
    </TouchableOpacity>
    )
  }

  const renderBottomSection = () => {
    return(
      <Box>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.base * 2,
          paddingVertical: SIZES.base * 2,
        }}>
          {/*DOTS*/}
          <Box align='center' justify='center' row>

            {
              [...Array(HelpTour.length)].map((_, index)=>(
                <View
                key={index}
                style={{
                  bottom: 105,
                  width: 12.3,
                  height: 12.3,
                  borderRadius: 20,
                  backgroundColor: index===currentPage?
                  COLORS.BLUE
                  : COLORS.white + '50',
                  marginRight: 10,
                  alignItems:'center',
                  justifyContent: 'center',
                }}/>
              ))
            }

            <Text color='light' style={{position: 'absolute', bottom: 75}}>@groupcyclingapp</Text>

          </Box>
        </View>
      </Box>
    )
  }



  const renderFlatlistItem = ({item}) => {
    return(
      <View style={{width: SIZES.width}}>
          <Spacer>
          <Title color='blue'>{item.titledesc}</Title>
          <Title style={{bottom: 5}} color='light'>{item.title}</Title>
          </Spacer>

          <Title style={{top:30}} color='blue'>{item.titlemap}</Title>
          <Title style={{bottom: 25}} color='blue'>{item.titleperfil}</Title>
          <Title style={{bottom: 80}} color='blue'>{item.titlenet}</Title>

          <Cover style={{top: 10}} source={item.image} resizeMode='contain' width="100%" height="300px"  />

          <View style={{paddingHorizontal: SIZES.base * 4, marginVertical: SIZES.base * 4}}>
          <Text style={{top: 190}} align color='light'>{item.text}</Text>
          <Text style={{top: 133}} align color='light'>{item.textnet}</Text>
          <Text style={{top: 123}} align color='light'>{item.textinit} </Text>
          </View>

          <Cover style={{bottom: 490}} source={item.img} resizeMode='contain' width="100%" height="300px" />
      </View>
  )
}

  const ButtonNext = () => {
    return (
      <>
        <TouchableOpacity
          disabled={false}
          onPress={handleNext}
          contentStyle={{width: 357, height: 91}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 150,
            marginHorizontal: 'auto',
            alignSelf: 'center',
            width: 357,
            paddingHorizontal: SIZES.base * 2,
            height: 92,
            borderRadius: 30,
            backgroundColor: COLORS.BLUE
          }}>
            <Text color='light'>{ currentPage != HelpTour.length - 1 ? "PRÓXIMO" : "EXPLORAR" }</Text>
            <AntDesignIcons name="right"
            style={{fontSize: 18, color: COLORS.white, opacity: 0.3, marginLeft: SIZES.base}}/>
            <AntDesignIcons
            name="right"
            style={{fontSize: 25, color: COLORS.white, marginLeft: -14}}
            />
        </TouchableOpacity>
      </>
    )
  }

  verifyTokenExists();
  return(
    <Box source={background}>
        <StatusBar barStyle='dark-content' backgroundColor={background}/>

        {/* TOP, BACK AND SKIP BUTTON*/}
        { renderTopSection() }

        {/* FLAT LIST */}
        <FlatList
        data={HelpTour}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={renderFlatlistItem}

        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        initialNumToRender={1}
        extraData={SIZES.width}
        />

        <ButtonNext />
        {/*Get started button*/}
        { renderBottomSection() }

   </Box>
  )
}


export default HelpScreen