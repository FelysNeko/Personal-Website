use crate::core::Error;
use crate::core::frontend::{
    TokenType as TT,
    Statement
};
use crate::core::runtime::{
    Output,
    Scope,
    Value
};


impl Statement {
    pub fn run(&mut self, env: &mut Scope, out: &mut Output, c: &mut usize) -> Result<(), Error> {
        if *c > 1000 {
            return Error::exceed_max_run();
        } else {
            *c += 1;
        }

        match self.keyword {
            TT::PRINT => self._run_print(env, out),
            TT::WHILE => self._run_while(env, out, c),
            TT::IF => self._run_if(env, out, c),
            TT::ELIF => self._run_elif(env, out, c),
            TT::ELSE => self._run_else(env, out, c),
            TT::NULL => self._run_expression(env),
            _ => Error::keyword_not_impl(self.keyword)
        }
    }

    fn _run_block(&mut self, env: &mut Scope, out: &mut Output, c: &mut usize) -> Result<(), Error> {
        env.extend();
        for stat in self.body.iter_mut() {
            stat.run(env, out, c)?;
        }
        env.shrink();
        Ok(())
    }

    fn _run_else(&mut self, env: &mut Scope, out: &mut Output, c: &mut usize) -> Result<(), Error> {
        self._run_block(env, out, c)
    }

    fn _run_elif(&mut self, env: &mut Scope, out: &mut Output, c: &mut usize) -> Result<(), Error> {
        if self.expr.eval(env)?._parse_to_bool()? {
            self._run_block(env, out, c)?;
        } else if let Some(stat) = self.alter.as_mut() {
            stat.run(env, out, c)?;
        }
        Ok(())
    }

    fn _run_if(&mut self, env: &mut Scope, out: &mut Output, c: &mut usize) -> Result<(), Error> {
        if self.expr.eval(env)?._parse_to_bool()? {
            self._run_block(env, out, c)?;
        } else if let Some(stat) = self.alter.as_mut() {
            stat.run(env, out, c)?;
        }
        Ok(())
    }

    fn _run_while(&mut self, env: &mut Scope, out: &mut Output, c: &mut usize) -> Result<(), Error> {
        while self.expr.eval(env)?._parse_to_bool()? {
            self._run_block(env, out, c)?;
        }
        Ok(())
    }

    fn _run_print(&mut self, env: &mut Scope, out: &mut Output) -> Result<(), Error> {
        let result: Value = self.expr.eval(env)?;
        out.push(result.value);
        Ok(())
    }

    fn _run_expression(&mut self, env: &mut Scope) -> Result<(), Error> {
        self.expr.eval(env)?;
        Ok(())
    }
}


impl Error {
    fn exceed_max_run() -> Result<(), Error> {
        Err(Self {
            msg: format!("exceed maxium 1000 statements running limitation")
        })
    }

    fn keyword_not_impl(kind: TT) -> Result<(), Error> {
        Err(Self {
            msg: format!("keyword `{:?}` is not supported", kind)
        })
    }
}