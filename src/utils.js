export const getData = (delay, result) => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(result)
      },
      delay
    )
  })
};

export const getDataWithError = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    }, delay)
  })
}
