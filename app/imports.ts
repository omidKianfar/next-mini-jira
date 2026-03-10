// -------------------------------------------------------------------default export
// packages
export { default as Stripe } from 'stripe';

// providers
export { default as ProvidersWrapper } from '@/src/providers';
export { default as EditorProviderComponent } from '@/src/providers/editor-provider';

// guard
export { default as AuthGuard } from '@/src/guards/auth-guard';
export { default as RoleGuard } from '@/src/guards/role-guard';

// -------------------------------------------------------------------export
// packages
export { useState } from 'react';
export { Poppins, Inter, Outfit } from 'next/font/google';
export { AnimatePresence, motion } from 'framer-motion';

// hooks
export { useNavigation } from '@/src/hooks/navigation/use-navigation';
export { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';

// routes
export { routes } from '@/src/helper/routes/routes';

// ui
export { default as ButtonNext } from '@/src/components/atom/buttons-component/button-next';
export { default as MyIcon } from '@/src/components/atom/icon-components';
export { default as FramerMotion } from '@/src/components/atom/animation-component';
export { default as SideBar } from '@/src/components/organisms/sidebar-component/user-sidebar/index';
export { default as Header } from '@/src/components/organisms/header-component/indx';

// -------------------------------------------------------------------type
// packages
export type { Metadata } from 'next';
export { NextRequest, NextResponse } from 'next/server';
export type { PropsWithChildren } from 'react';

// global types
export { UserType } from '@/src/types/global';
