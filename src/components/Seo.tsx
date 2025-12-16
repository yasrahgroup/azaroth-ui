import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type SeoProps = {
  title?: string;
  description?: string;
};

export const Seo = ({ title, description }: SeoProps) => {
  const { t, i18n } = useTranslation();

  const siteTitle = title ? `${title} | ${t('app.title')}` : t('app.title');
  const siteDescription = description || t('app.description');

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.dir()} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
    </Helmet>
  );
};
