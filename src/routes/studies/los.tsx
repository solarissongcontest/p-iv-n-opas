import {createFileRoute} from '@tanstack/react-router';
import {StudyAppRoot} from '@/app/StudyApp';

// LOS! retains StudyOS device authentication and the existing application shell.
export const Route=createFileRoute('/studies/los')({
 component:()=> <StudyAppRoot initialPage="courses" losView />,
});
