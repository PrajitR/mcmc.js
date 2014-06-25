// Sample from a Gaussian distribution parameterized by mean and variance.
function gaussian_sample(mean, variance, num_samples) {
  // Use Box-Muller transform.
  // From http://stats.stackexchange.com/a/16350
  mean = mean || 0;
  variance = variance || 1;
  num_samples = num_samples || 1;
  var std = Math.sqrt(variance);

  function sample() {
    var w = 1, u, v;
    while (w >= 1) {
      u = 2 * Math.random() - 1;
      v = 2 * Math.random() - 1;
      w = Math.pow(u, 2) + Math.pow(v, 2);
    }
    var z = Math.sqrt((-2 * Math.log(w)) / w);
    return std * (u * z) + mean;
  }

  if (num_samples == 1) {
    return sample();
  } else {
    var samples = [];
    for (var i = 0; i < num_samples; i++) {
      samples.push(sample());
    }
    return samples;
  }
}

function gaussian_pdf(x, mean, variance) {
  mean = mean || 0;
  variance = variance || 1;
  var std = Math.sqrt(variance);

  // Taken from jsStat.distribution.normal.pdf
  return Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(std) - Math.pow(x - mean, 2) / (2 * variance));
}

var distribution = { normal_sample: gaussian_sample, normal_pdf: gaussian_pdf};
module.exports = distribution;