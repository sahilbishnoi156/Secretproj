import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDB } from '@/database/db'
import User from '@/models/user';


export const options = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder:'Johndoe@gmail.com'
                },
                password:{
                    label: 'Password',
                    type: 'password',
                    placeholder: '*********'
                }
            },
            async authorize(credentials){
                try {
                    await connectToDB();
                    const user = await User.findOne({email: credentials.email})
                    if(user && user.email === credentials.email && user.password === credentials.password){
                        return user
                    }else{
                        return null;
                    }
                } catch (error) {
                    console.log("Something went wrong while authrizing user", error)
                }
                
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            return session
          }
      }
    // pages: { // If you have one
    //     signIn: '/singIN'
    // }
}