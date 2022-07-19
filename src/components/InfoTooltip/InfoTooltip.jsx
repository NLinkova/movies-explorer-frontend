import React, { useContext, useEffect } from 'react';
import './InfoTooltip.css';
import TooltipContext from '../../contexts/TooltipContext';
import { TOOLTIP_SHOWN_DURATION_MS } from '../../constants/constants';

export default function InfoTooltip({ message }) {
  const { setTooltipMessage } = useContext(TooltipContext);

  useEffect(() => {
    setTimeout(() => {
      setTooltipMessage('');
    }, TOOLTIP_SHOWN_DURATION_MS);
  });

  return (
    <div className={`info-tooltip ${message && 'info-tooltip_opened'}`}>
      <p className="info-tooltip__text">{message}</p>
    </div>
  );
}
