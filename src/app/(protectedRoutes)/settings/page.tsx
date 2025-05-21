import { onAuthenticatedUser } from '@/actions/auth';
import { getStripeOAuthLink } from '@/lib/stripe/utils';
import {
  LucideAlertCircle,
  LucideArrowRight,
  LucideCheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const Settings = async (props: Props) => {
  const userExists = await onAuthenticatedUser();
  if (!userExists.user) {
    redirect('/sign-in');
  }

  const isConnected = userExists?.user?.stripeConnectId;
  // console.log(userExists);

  const stripeLink = getStripeOAuthLink(
    'api/stripe-connect',
    userExists.user.id
  );

  return (
    <div className='w-full mx-auto py-8 px-4'>
      <h1 className='text-2xl font-bold mb-6'>Payment Integration</h1>

      <div className='w-full p-6 border border-input rounded-lg bg-background shadow-sm'>
        <div className='flex items-center mb-4'>
          <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='white'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-star-icon lucide-star'
            >
              <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
            </svg>
          </div>
          <div>
            <h2 className='text-xl font-semibold text-primary'>
              Stripe Connect
            </h2>
            <p className='text-muted-foreground text-sm'>
              Connect your Stripe accounts to start accepting payments
            </p>
          </div>
        </div>

        <div className='my-6 p-4 bg-muted rounded-md'>
          <div className='flex items-start'>
            {isConnected ? (
              <LucideCheckCircle2 className='h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0' />
            ) : (
              <LucideAlertCircle className='h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0' />
            )}

            <div>
              <p className='font-medium'>
                {isConnected
                  ? 'Your Stripe account is connected'
                  : 'Your Stripe account is not connected yet'}
              </p>
              <p className='text-sm text-muted-foreground mt-1'>
                {isConnected
                  ? 'You can now accept payments through your application'
                  : 'Connect your Stripe accounts to start processing payments and managing subscriptions'}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='text-sm text-muted-foreground'>
            {isConnected
              ? 'You can reconnect anytime if needed'
              : "You'll be redirected to Stripe to complete the connection"}
          </div>

          {/* TODO: Add the stripe link */}
          <Link
            href={stripeLink}
            // href={'#'}
            className={`px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${
              isConnected
                ? 'bg-muted hover:bg-muted/80 text-foreground'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
            }`}
          >
            {isConnected ? 'Reconnect' : 'Connect with Stripe'}
            <LucideArrowRight size={16} />
          </Link>
        </div>

        {!isConnected && (
          <div className='mt-6 pt-6 border-t border-border'>
            <h3 className='text-sm font-medium mb-2'>
              Why connect with Stripe?
            </h3>

            <ul className='text-sm text-muted-foreground space-y-2'>
              <li className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded-full bg-green-100 flex items-center justify-center'>
                  <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                </div>
                Process payments securely from customers worldwide
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded-full bg-green-100 flex items-center justify-center'>
                  <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                </div>
                Manage subscriptions and recurring billing
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded-full bg-green-100 flex items-center justify-center'>
                  <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                </div>
                Access detailed financial reports and analytics
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
