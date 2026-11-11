import { useApp } from '../context/useApp';

export default function AboutUs() {
  const { t } = useApp();

  return (
    <article className="about-us page-section">
      <p className="eyebrow"><span aria-hidden="true">✳</span> {t.appName}</p>
      <h1>{t.aboutTitle}</h1>
      <p className="hero-intro about-intro">{t.aboutIntro}</p>
      <section className="about-card">
        <h2>{t.missionTitle}</h2>
        <p>{t.mission}</p>
      </section>
      <section className="about-card">
        <h2>{t.whyTitle}</h2>
        <ul><li>{t.whySearch}</li><li>{t.whyRandom}</li><li>{t.whyCategories}</li></ul>
      </section>
    </article>
  );
}
