function routes(app, controller) {
//route
    app.post("/signup", async (req, res, next) => {
        const { name, nickname, password } = req.body;
        try {
            const result = await controller.signupAction({ name, nickname, password });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });



    app.post("/login", async (req, res, next) => {
        const { name, password } = req.body;
        try {
            const result = await controller.loginAction({ name, password });
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    app.post("/logout", controller.isLoggedIn, async (req, res, next) => {
        const userId = req.userId;
        try {
            const result = await controller.logoutAction(userId);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    });

    app.post("/getUserData", controller.isLoggedIn, async (req, res, next) => {
        try {
            res.json({ success: true, result: req.user });
        } catch (e) {
            next(e);
        }
    });

}

module.exports = routes;