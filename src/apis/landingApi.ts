import { LoginStatusType } from 'app/page';

export const landingApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/back/api/landing/stage`;

export interface LandingStageProps { 
    stage: LoginStatusType;
}
