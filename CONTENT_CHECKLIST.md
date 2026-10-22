# To confirm before public launch

- [ ] CV PDF: provide `public/cv-mohamed-kandad.pdf`, then set `contact.cv` or `NEXT_PUBLIC_CV_URL` to `/cv-mohamed-kandad.pdf`. The UI shows a disabled CV action with a dashed tag until a real file exists.
- [ ] MadrasatiCom: real screenshots, project year, demo link, public GitHub link, individual contribution vs. team, and specific technical challenges.
- [ ] Popcard Rewards Staff App: real screenshots, project year, demo link, public GitHub link, individual feature ownership vs. team, and specific technical challenges.
- [ ] Product Manager: real screenshots, project year, demo link, public GitHub link, individual contribution vs. team, specific technical challenges, and any authentication claims.
- [ ] Configure a verified email sender, `RESEND_API_KEY`, `CONTACT_FROM`, and `CONTACT_TO`; test actual delivery. Direct email remains available.
- [ ] Add project outcomes only when verified. No results or metrics are currently invented.
- [ ] Measure Lighthouse and Core Web Vitals on the production host before claiming scores or CLS 0.

# Confirmed and implemented

- [x] User-supplied orange-background portrait, optimized and used in the code portrait/lens and About section.
- [x] Real email, GitHub, LinkedIn, phone, and Casablanca location.
- [x] Five roles and dates, supplied in the approved redesign brief.
- [x] Education, language levels, skills, integrations, and learning topics supplied in the approved brief.
- [x] Ordered landing sections, responsive navigation, 1.5-second loader, code-portrait canvas, photo lens, badge, marquee, React Native capability grid, About, alternating work rows, professional-work disclosure, career timeline, education/languages, accessible skill tabs, contact, and footer.
- [x] Reusable case-study routes with Overview, Business need, Architecture, Features, Technical challenges, and My contribution. Results render only if verified content is supplied.
- [x] Typed content modules; no new runtime dependency for the redesign.
- [x] Reduced-motion behavior and cleanup for canvas, observers, listeners, and animation frames.
