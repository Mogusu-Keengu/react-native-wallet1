import { Stack } from "expo-router";
import { HeaderShownContext } from "expo-router/build/react-navigation";
import SafeScreen from "../../components/SafeScreen"
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Slot } from 'expo-router'



const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
console.log('publishableKey:', publishableKey)
if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {/* <SafeScreen> */}
        {/* <Stack screenOptions={{headerShown: false}}/> */}
        <Slot/>
      {/* </SafeScreen> */}
    </ClerkProvider>
  )
}
