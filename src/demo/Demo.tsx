import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  page: {
    fontFamily: "system-ui, sans-serif",
    padding: 32,
  },
});

export function Demo() {
  return (
    <main {...stylex.props(styles.page)}>
      <h1>Demo</h1>
      <p>The log lands in a later pull request.</p>
      <a href="./index.html">Back to the landing page</a>
    </main>
  );
}
