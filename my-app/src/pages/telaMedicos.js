import { useEffect, useState } from "react"
import { ActivityIndicator, Button, FlatList, Text } from "react-native"
import { View } from "react-native"
import Estilo from "../components/Estilo";


export default props => {
     const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/medico'; //"https://localhost:7010/api/medico/all";

    const getMovies = async () => {
        try{
            const response = await fetch(URL);
            const json = await response.json();
            console.log(json);
            setData(json);
        } catch(error) {
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getMovies();
    }, [])

    return(
        <>
            <View>
                <Text>Exemplo API</Text>

                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={ ({item})=>(
                            <Text style={Estilo.textFlatList}>
                                - {item.id} - {item.nome}
                            </Text>
                        )
                        }
                    />
                )
                }
                <Button title="Atualizar" onPress={ () => getMovies()} />
            </View>
        </>
    )
}