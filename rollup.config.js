import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/rallax.js',
  output: {
    file: 'dist/rallax.js',
    format: 'umd',
    name: 'rallax'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ["env", {
          "modules": false
        }]
      ],
      plugins: [
        "external-helpers"
      ]
    })
  ]
}