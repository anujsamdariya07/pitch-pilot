'use server'

import { stripe } from "@/lib/stripe"
import { onAuthenticatedUser } from "./auth"

export const getAllProductsFromStripe = async () => {
  try {
    const currentUser = await onAuthenticatedUser()
    if (!currentUser.user) {
      return {
        error: 'User not authenticated!',
        status: 401,
        success: false,
      }
    }

    if (!currentUser.user.stripeConnectId) {
      return {
        error: 'User not connected to Stripe!',
        status: 401,
        success: false
      }
    }

    const products = await stripe.products.list(
      {},
      {
        stripeAccount: currentUser.user.stripeConnectId
      }
    )

    return {
      products: products.data,
      status: 200,
      success: true
    }
  } catch (error) {
    console.error('Error getting products from Stripe', error)
    return {
      error: 'Error getting products from Stripe',
      status: 500,
      success: false
    }
  }
}