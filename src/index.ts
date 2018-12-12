import Progress from 'progress';

interface IProgress {
  tick: () => void;
}
interface IProgressArgs {
  stream?: NodeJS.WriteStream;
}
function createProgress(
  total: number,
  { stream = process.stderr }: IProgressArgs = {}
): IProgress {
  if (process.stderr.isTTY) {
    return new Progress(`[:bar] :current/:total :percent :rate/s :etas `, {
      total,
      stream
    });
  } else {
    let current = 0;
    let percent = 0;
    let start = +new Date();
    return {
      tick: () => {
        current += 1;
        const ratio = Math.min(Math.max(current / total, 0), 1);
        const value = Math.floor(ratio * 100);
        if (value !== percent) {
          percent = value;
          const elapsed = +new Date() - start;
          const eta = percent === 100 ? 0 : elapsed * (total / current - 1);
          const rate = current / (elapsed / 1000);
          stream.write(
            `    ${percent}% ${Math.round(rate)}/s ${
              isNaN(eta) || !isFinite(eta) ? '0.0' : (eta / 1000).toFixed(1)
            }s`
          );
        }
      }
    };
  }
}

export default createProgress;
