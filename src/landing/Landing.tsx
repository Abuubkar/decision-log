import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  page: {
    fontFamily: "system-ui, sans-serif",
    padding: 32,
  },
});

export function Landing() {
  return (
    <main {...stylex.props(styles.page)}>
      <h1>Decision Log</h1>
      <p>The landing page lands in a later pull request.</p>
      <a href="./demo.html">Try the demo</a>
    </main>
  );
}
