module.exports = (sequelize, DataTypes) => {
	const Cart =sequelize.define('cart',{
	
		userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
		
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			payed: {
				type: DataTypes.BOOLEAN,
			},
		},

		{ underscored: true }
	);
	
	return  Cart;
};
