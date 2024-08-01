import React, { useState } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import useUsers from '../hooks/useUsers'

const UserForm = ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useUsers()
    return (
        <View style={style.form}>
            <Text style={style.welcome}>Olá, {user.name ? user.name : "Pessoa" }</Text>
            <View style={style.imageContainer}>
                <Image
                    style={style.logo}
                    source={{
                        uri: user.avatarUrl
                    }}
                />
            </View>
            <Text>Name</Text>
            <TextInput
                style={style.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder='Informe o Nome'
                value={user.name}
            />
            <Text>E-mail</Text>
            <TextInput
                style={style.input}
                onChangeText={email => setUser({ ...user, email })}
                placeholder='Informe o Email'
                value={user.email}
            />
            <Text>Avatar</Text>
            <TextInput
                style={style.input}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder='Informe a URL do Avatar'
                value={user.avatarUrl}
            />

            <Button
                title='Salvar'
                onPress={() => {
                    dispatch({
                        type: user.id ? "updateUser" : "createUser",
                        payload: user
                    })
                    navigation.goBack()

                }}
            />
        </View>
    )
}

export default UserForm

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    },
    imageContainer: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    logo: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 75
    },
    welcome: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        fontWeight: "bold"
    }

})