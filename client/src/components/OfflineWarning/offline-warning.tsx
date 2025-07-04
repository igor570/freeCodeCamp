import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert, Spacer } from '@freecodecamp/ui';

import './offline-warning.css';

const delayInMilliSeconds = 5000;
let id: ReturnType<typeof setTimeout>;

interface OfflineWarningProps {
  isOnline: boolean;
  isServerOnline: boolean;
  isSignedIn: boolean;
}

function OfflineWarning({
  isOnline,
  isServerOnline,
  isSignedIn
}: OfflineWarningProps): JSX.Element | null {
  const { t } = useTranslation();
  const [showWarning, setShowWarning] = React.useState(false);
  let message;

  if (!isSignedIn || (isOnline && isServerOnline)) {
    clearTimeout(id);
    if (showWarning) setShowWarning(false);
  } else {
    message = !isOnline ? (
      t('misc.offline')
    ) : (
      <Trans i18nKey='misc.server-offline'>
        <a href={'mailto:support@freecodecamp.org'}>placeholder</a>
      </Trans>
    );
    timeout();
  }

  function timeout() {
    id = setTimeout(function () {
      setShowWarning(true);
    }, delayInMilliSeconds);
  }

  return showWarning ? (
    <>
      <Alert variant='info' className='offline-warning'>
        {message}
      </Alert>
      <Spacer size='m' />
    </>
  ) : null;
}

OfflineWarning.displayName = 'OfflineWarning';

export default OfflineWarning;
