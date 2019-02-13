import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const sourcemap = true;

export default {
  input: 'src/lib/index.js',
  external: ['react', 'prop-types'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    postcss({ plugins: [] })
  ],
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap
    },
    {
      file: pkg.umd,
      format: 'umd',
      name: 'react-highlight-pop',
      sourcemap,
      globals: {
        react: 'react',
      }
    }
  ]
};
