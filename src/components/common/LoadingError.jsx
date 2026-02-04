import React from 'react';
import { styles } from './styles';

const LoadingError = ({ loading, error }) => (
  <>
    {loading && <span style={styles.loadingSpinner}>⏳ Loading...</span>}
    {error && <div style={styles.errorMessage}>❌ Error: {error}</div>}
  </>
);

export default LoadingError;
