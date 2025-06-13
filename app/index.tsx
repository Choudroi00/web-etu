import { Stack, Link } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import StudentPortalApp from './student-portal';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StudentPortalApp />
    </>
  );
}
