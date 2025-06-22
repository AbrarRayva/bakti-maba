'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ForumPost', {
      id_post: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_thread: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ForumThread',
          key: 'id_thread'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'nim'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      parent_post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ForumPost', // Self-reference
          key: 'id_post'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Use SET NULL or CASCADE as appropriate
      },
      isi_pesan: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      waktu_kirim: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
    await queryInterface.dropTable('ForumPost');
  }
};