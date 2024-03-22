module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			amount: {
				type: DataTypes.DOUBLE,
			},
		},
		{ underscored: true }
	);
	return CartItem;
};
