const Tought = require("../models/Tought");
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    let search = "";
    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";
    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }
    const toughts = await Tought.findAll({
      include: User,
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [["createdAt", order]],
    });
    let toughtsQty = toughts.length;
    if (toughtsQty === 0) {
      toughtsQty = false;
    }
    const tought = toughts.map((result) => result.get({ plain: true }));
    res.render("toughts/home", { tought, search, toughtsQty });
  }
  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });
    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.redirect("/login");
      return;
    }

    const toughts = user.Toughts.map((tought) => tought.dataValues);
    let emptyToughts = false;
    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/dashboard", { toughts, emptyToughts });
  }
  static createTought(req, res) {
    res.render("toughts/create");
  }
  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Tought.create(tought);
      req.flash("message", "Pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async removeTought(req, res) {
    const id = req.body.id;

    try {
      await Tought.destroy({ where: { id } });
      req.flash("message", "Pensamento removido com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async editTought(req, res) {
    const id = req.params.id;
    const tought = await Tought.findOne({ where: { id: id }, raw: true });

    res.render("toughts/edit", { tought });
  }

  static async editToughtSave(req, res) {
    const id = req.body.id;
    const tought = {
      title: req.body.title,
    };
    try {
      await Tought.update(tought, { where: { id: id } });
      req.flash("message", "Pensamento editado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
