import React from 'react';
import { usePwa } from '../../context/PwaContext';
import { PwaInstallModal } from './PwaInstallModal';
import { PwaInstallBanner } from './PwaInstallBanner';

export function PwaContainer() {
  const { showInstallModal, setShowInstallModal } = usePwa();

  return (
    <>
      <PwaInstallBanner />
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </>
  );
}
