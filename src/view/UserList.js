import React from 'react'
import { Alert, FlatList, StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import useUsers from '../hooks/useUsers'


const UserList = ({ navigation }) => {

    const { state, dispatch } = useUsers()

    const confirmDelete = (user) => {
        Alert.alert("Excluir Usuário", "Deseja excluir usuário?", [
            {
                text: "Sim",
                onPress: () => {
                    dispatch({
                        type: "deleteUser",
                        payload: user
                    })
                }
            },
            {
                text: "Não"
            }
        ])
    }

    const getUserItem = ({ item }) => {
        return (
            <>
                <ListItem
                    key={item.id}
                    bottomDivider
                    onPress={() => navigation.navigate("UserForm", item)}
                >
                    <Avatar
                        rounded
                        source={{ uri: item.avatarUrl }}
                    />
                    <ListItem.Content>
                        <Text style={style.title}>{item.name}</Text>
                        <Text style={style.subTitle}>{item.email}</Text>
                    </ListItem.Content>

                    <ListItem.Chevron
                        type='ionicon'
                        iconProps={{ name: 'pencil', size: 25, color: 'orange' }}
                        onPress={() => navigation.navigate("UserForm", item)}
                    />

                    <ListItem.Chevron
                        type='ionicon'
                        iconProps={{ name: 'trash', size: 25, color: 'red' }}
                        onPress={() => confirmDelete(item)}
                    />
                </ListItem>

            </>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}

export default UserList

const style = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subTitle: {
        color: "#999999"
    }
})