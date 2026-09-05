// import { useAuth, useSignUp } from '@clerk/expo'
// import { useState } from 'react'
// import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

// export default function MainScreen() {
//   const { isLoaded, isSignedIn } = useAuth()
//   const { signUp } = useSignUp()

//   const [emailAddress, setEmailAddress] = useState('')
//   const [password, setPassword] = useState('')
//   const [code, setCode] = useState('')
//   const [isVerifying, setIsVerifying] = useState(false)

//   const handleSignUp = async () => {
//     const { error } = await signUp.password({ emailAddress, password })
//     if (error) {
//       // Handle the error in your app.
//       // See https://clerk.com/docs/guides/development/custom-flows/error-handling
//       return
//     }

//     const { error: sendError } = await signUp.verifications.sendEmailCode()
//     if (sendError) {
//       // Handle the error in your app.
//       return
//     }

//     setIsVerifying(true)
//   }

//   const handleVerify = async () => {
//     const { error } = await signUp.verifications.verifyEmailCode({ code })
//     if (error) {
//       // Handle the error in your app.
//       return
//     }

//     const { error: finalizeError } = await signUp.finalize()
//     if (finalizeError) {
//       // Handle the error in your app.
//     }
//   }

//   if (!isLoaded) {
//     return null
//   }

//   if (isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <Text>You're signed in</Text>
//       </View>
//     )
//   }

//   if (isVerifying) {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={setCode}
//           keyboardType="numeric"
//         />
//         <Button title="Verify" onPress={handleVerify} />
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         onChangeText={setEmailAddress}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//         onChangeText={setPassword}
//       />
//       <Button title="Sign up" onPress={handleSignUp} />
//       {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
//       <View nativeID="clerk-captcha" />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 12,
//     justifyContent: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
// })


  import { useEffect } from 'react'

import { useSignUp } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const onSignUpPress = async () => {
    console.log("pressed", isLoaded);
    
    if (!isLoaded) return
    try {
      await signUp.create({ emailAddress, password })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.replace('/')
      } else {
        console.log(result)
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <TextInput
          value={code}
          placeholder="Verification code"
          onChangeText={setCode}
          style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }


useEffect(() => {
  console.log('isLoaded changed:', isLoaded)
}, [isLoaded])

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={setEmailAddress}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TouchableOpacity onPress={onSignUpPress}>
        <Text>Sign up</Text>
        <View>
          <Text>Here update there</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}