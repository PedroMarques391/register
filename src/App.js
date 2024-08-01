import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import UserList from "./view/UserList";
import UserForm from "./view/UserForm";
import { Button, Icon } from "react-native-elements";
import { UsersProvider } from "./context/UsersContext";


const { Navigator, Screen } = createStackNavigator()

const screenOptions = {
  headerStyle: {
    backgroundColor: "#3590e4"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
}

const App = () => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}
        >
          <Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
              return {
                title: "Lista de Usuários",
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="add" size={25} color={"white"} />}
                    onPress={() => navigation.navigate("UserForm")}
                  />
                )
              }
            }}
          />
          <Screen
            name="UserForm"
            component={UserForm}
            options={{
              title: "Formulário de Usuários"
            }}
          />
        </Navigator>

      </NavigationContainer>
    </UsersProvider>
  )
}

export default App