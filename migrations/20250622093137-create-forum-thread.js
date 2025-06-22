'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ForumThreads', {
      id_thread: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user_pembuat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isi_pembuka: {
        type: Sequelize.TEXT
      },
      waktu_dibuat: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      is_pinned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_open: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      akses: {
        type: Sequelize.STRING,
        defaultValue: 'publik',
        validate: {
          isIn: [['publik', 'admin']]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ForumThreads');
  }
};