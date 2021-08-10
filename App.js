import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('Iniciar');
  const [ultimo, setUltimo] = useState(null);

  function iniciar(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setBotao('Iniciar');
    }else{
      timer = setInterval(() =>{ 
        
        ss++;

        if(ss == 60){
          ss = 0;
          mm++;
        }
        if(mm == 60){
          mm = 0;
          hh++;
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

        setNumero(format);

        
      }, 1000)
      setBotao('Pausar');
    }
  }

  function reiniciar(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;

    setBotao('Iniciar')
  }

  return(
    <View style={styles.container}>
      
      <View style={styles.cronArea}>
        <Image 
        source={require('./src/crono.png')}
        />

        <Text style={styles.timer}>{numero}</Text>     
      </View>
       

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}  onPress={reiniciar}>
          <Text style={styles.btnTexto}>Recomeçar</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoMarcado}>{ultimo ? 'Ultimo tempo: ' + ultimo : ''}</Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cronArea:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnArea:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    height: 40, 
  },
  btn:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
  },
  areaUltima:{
    flex: 0.5,
    marginTop: -50,
  },
  textoMarcado:{
    fontSize: 23,
    fontStyle: 'italic',
    color: '#FFF',
  }


})