const {DataTypes, Sequelize, Model} = require('sequelize')
const {app} = require('electron')
const path = require('path')
//import {DataTypes, Sequelize, Model} from 'sequelize'


class DataModelBackup {

	sequelize = new Sequelize({
		logging: false,
		dialect: 'sqlite',
		storage: path.join(app.getPath('documents'), 'ytData.sqlite')
	})

	async getUserModel() {

		console.log('create UserModel')

		class User extends Model {}

		await User.init({
			savePath: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			sequelize: this.sequelize,
			modelName: 'User',
			freezeTableName: true
		})

		await User.sync({alter: true})

		return User
	}

	async getVideoModel() {

		console.log('create VideoModel')

		class Video extends Model {}

		await Video.init({
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false
			},
			duration: {
				type: DataTypes.STRING,
				allowNull: false
			},
			savePath: {
				type: DataTypes.STRING,
				allowNull: true
			},
			thumbnail: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			sequelize: this.sequelize,
			modelName: 'Video',
			freezeTableName: true
		})

		await Video.sync({alter: true})

		return Video
	}
}

module.exports = new DataModelBackup()