import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';

// Force inclusion of dynamic pages in the manifest
import './Pages/Training/Certificates/Detail';

const appName = import.meta.env.VITE_APP_NAME || 'NYP-IP Portal';




createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }: { el: HTMLElement; App: React.FC; props: any }) {
        const appElement = (
            <ThemeProvider initialTheme={props.initialPage.props.theme ?? 'light'}>
                <App {...props} />
            </ThemeProvider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, appElement);
            return;
        }
        createRoot(el).render(appElement);
    },
    progress: {
        color: '#10b981',
    },
});
