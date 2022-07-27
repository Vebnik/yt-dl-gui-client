const {DataTypes, Sequelize, Model} = require('sequelize')
const {app} = require('electron')
const path = require('path')



class DataModelBackup {

	async getUserModel() {

		class User extends Model {}

		const sequelize = await new Sequelize({
			dialect: 'sqlite',
			storage: path.join(app.getPath('documents'), 'ytData.sqlite')
		})

		await User.init({
			savePath: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			sequelize: sequelize,
			modelName: 'User',
			freezeTableName: true
		})
		await User.sync({alter: true})

		return User
	}


}

module.exports = new DataModelBackup()