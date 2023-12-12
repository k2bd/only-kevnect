const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      // Handle successful copying
      console.log('Copied to clipboard');
    },
    (err) => {
      // Handle errors
      console.error('Could not copy text: ', err);
    }
  );
};

export default copyToClipboard;
