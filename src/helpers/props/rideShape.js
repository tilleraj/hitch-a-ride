import PropTypes from 'prop-types';

const rideShape = PropTypes.shape({
  driverId: PropTypes.string.isRequired,
  isLyftUber: PropTypes.bool.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  totalSeats: PropTypes.number.isRequired,
});

export default { rideShape };
