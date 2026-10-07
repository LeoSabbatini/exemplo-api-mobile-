import { BuscarUsuario } from "@/api/get-usuario";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, ActivityIndicator, StyleSheet} from "react-native";

export default function Perfil(){
    const { id }= useLocalSearchParams<{id: string}>()
    const {data, isError, isLoading}=useQuery({
        queryKey: ["usuario", id],
        queryFn: () => BuscarUsuario(id)
    })

      if(isLoading){
        return(
          <View  style={styles.centro}>
            <ActivityIndicator />
            <Text>Carregando usuário</Text>
          </View>
        )
      }
    
      if(isError){
        return(
        <View style={styles.centro}>
          <Text>Ops! Erro ao carregar usuarios!</Text>
        </View>)
      }

    return(
        <View style={styles.container}>
            <Image style={styles.avatar} source={{uri: data.avatar}}/>
            <Text style={styles.nome}>
                {data.first_name} {data.last_name}
            </Text>
            <Text style={styles.email}>{data.email}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    centro: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        gap: 6
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8
    },
    nome: {
        fontSize: 20,
        fontWeight: "600"
    },
    email: {
        fontSize: 14
        
    }
})