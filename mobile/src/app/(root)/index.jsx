import { useAuth, useUser } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const { signOut } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const onSignOutPress = async () => {
    try {
      await signOut()
      router.replace('/sign-in')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>
          Welcome{user?.firstName ? `, ${user.firstName}` : ''} 👋
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 30 }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

        <TouchableOpacity
          onPress={onSignOutPress}
          style={{
            backgroundColor: '#111',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}