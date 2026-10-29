import "@/styles/pillars.css";

/**
 * The image-backed card from the E-learning pillars: quiet at rest (mark,
 * number, title), opening on hover to the body and, when there is an
 * `href`, a "Learn more" link. The copy is in the DOM the whole time;
 * only its box is collapsed.
 *
 * The entrance and the glass ramp key off an ancestor carrying `is-in`
 * (see useInView), staggered by `index`.
 */
export default function PillarCard({ index, title, body, href, icon, image }) {
  return (
    <article className="pillar" style={{ "--i": index }}>
      {image && (
        <img
          className="pillar__bg"
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="pillar__scrim" aria-hidden="true" />

      <div className="pillar__top">
        <span className="pillar__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="pillar__no">{String(index + 1).padStart(2, "0")}</span>
      </div>

      {/* Everything the card says sits on one panel, so the photograph is
          blurred once behind the whole block rather than haloed line by
          line. */}
      <div className="pillar__panel">
        <h3 className="pillar__title">{title}</h3>

        {/* The rule stays outside the collapsing row: it draws *before*
            the box opens, so the card reads as unlocking, not growing. */}
        <span className="pillar__rule" aria-hidden="true" />

        <div className="pillar__reveal">
          <div>
            <p className="pillar__body">{body}</p>
            {href && (
              <span className="pillar__cta" aria-hidden="true">
                Learn more
              </span>
            )}
          </div>
        </div>
      </div>

      {href && (
        <a className="pillar__link" href={href}>
          <span className="pillar__sr">Learn more about {title}</span>
        </a>
      )}
    </article>
  );
}
