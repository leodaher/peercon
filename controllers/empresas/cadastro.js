var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    middleware = require("../../middleware/index"),
    Empresa = require("../../models/empresa"),
    fs = require("fs"),
    multipart = require("connect-multiparty"),
    multipartMiddleware = multipart(),
    formValidator = require("../../helpers/formValidator");


//NEW EMPRESA
router.get("/", middleware.isLoggedIn, function(req, res){
    var parte = 1;
    if(typeof(req.query.parte) != "undefined") {
       parte = req.query.parte;
    }

    if(parte == 1) {
        var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
        Empresa.findOne(query, function(err, empresa){
            if(err) {
                console.log(err);
            } else {
                if(!empresa) {
                    res.render("empresas/cadastro/parte1/new");
                } else if(empresa.status != "Incompleto") {
                  res.redirect("/dashboard/cadastro-empresa/edit?parte="+parte);
                } else {
                  if(!empresa.pessoaFisica.isComplete) {
                    res.render("empresas/cadastro/parte1/new");
                  } else {
                    res.redirect("/dashboard/cadastro-empresa/edit?parte="+parte);
                  }
                }
            }
        })
    }

    else if(parte == 2) {
        var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
        Empresa.findOne(query, function(err, empresa){
            if(err) {
                console.log(err);
            } else {
                if(!empresa){
                    res.redirect("/dashboard/cadastro-empresa");
                } else if(empresa.status != "Incompleto") {
                  res.redirect("/dashboard/cadastro-empresa/edit?parte="+parte);
                } else {
                    if(!empresa.pessoaFisica.isComplete) {
                        res.redirect("/dashboard/cadastro-empresa");
                    } else {
                        if(!empresa.pessoaJuridica.isComplete) {
                          res.render("empresas/cadastro/parte2/new");
                        } else {
                          res.redirect("/dashboard/cadastro-empresa/edit?parte=2");
                        }
                    }
                }
            }
        });
    }

    else if(parte == 3) {
        var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
        Empresa.findOne(query, function(err, empresa){
            if(err) {
                console.log(err);
            } else {
                if(empresa == null) {
                    res.redirect("/dashboard/cadastro-empresa");
                } else if(empresa.status != "Incompleto") {
                  res.redirect("/dashboard/cadastro-empresa/edit?parte="+parte);
                } else {
                    if(!empresa.pessoaJuridica.isComplete) {
                        res.redirect("/dashboard/cadastro-empresa?parte=2");
                    } else {
                        if(!empresa.dadosFinanceiros.isComplete) {
                          res.render("empresas/cadastro/parte3/new");
                        } else {
                          res.redirect("/dashboard/cadastro-empresa/edit?parte=3");
                        }
                    }
                }
            }
        });
    }

    else if(parte == "anexos") {
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOne(query, function(err, empresa){
          if(err) {
              console.log(err);
          } else {
              if(empresa == null) {
                  res.redirect("/dashboard/cadastro-empresa");
              } else if(empresa.status != "Incompleto") {
                res.redirect("/dashboard/cadastro-empresa/edit?parte="+parte);
              } else {
                  if(!empresa.dadosFinanceiros.isComplete) {
                      res.redirect("/dashboard/cadastro-empresa?parte=3");
                  } else {
                      if(!empresa.anexos.isComplete) {
                        res.render("empresas/cadastro/anexos/new");
                      } else {
                        res.redirect("/dashboard/cadastro-empresa/edit?parte="+parte);
                      }
                  }
              }
          }
      });
    }
});


//CREATE EMPRESA
router.post("/", multipartMiddleware, middleware.isLoggedIn, function(req, res){
    if(req.body.parte == "1"){
        var name = req.body.name;
        var birthday = req.body.date;
        var CPF = req.body.cpf;
        var RG = req.body.rg;
        var orgaoEmissor = req.body.orgaoEmissor;
        var cidadeNatal = req.body.cidadeNatal;
        var phone = req.body.telephone;
        var cellphone = req.body.cellphone;
        var politicamenteExp = req.body.politicamenteExposta;
        var aluguel = req.body.aluguel;
        var renda = req.body.renda;
        var patrimonio = req.body.patrimonio;

        var cep = req.body.cep;
        var logradouro = req.body.logradouro;
        var number = req.body.number;
        var complement = req.body.complement;
        var city = req.body.city;
        var state = req.body.state;


        req.checkBody('name','Nome é um campo obrigatório!').notEmpty();
        req.checkBody('date','Data de nascimento é um campo obrigatório!').notEmpty();
        req.checkBody('cpf','CPF é um campo obrigatório!').notEmpty();
        req.checkBody('rg','RG é um campo obrigatório!').notEmpty();
        req.checkBody('orgaoEmissor','Órgão emissor é um campo obrigatório!').notEmpty();
        req.checkBody('cidadeNatal','Cidade natal é um campo obrigatório!').notEmpty();
        req.checkBody('telephone','Telefone fixo é um campo obrigatório!').notEmpty();
        req.checkBody('cellphone','Celular é um campo obrigatório!').notEmpty();
        req.checkBody('renda','Renda Mensal Declarada é um campo obrigatório!').notEmpty();
        req.checkBody('patrimonio','Patrimônio é um campo obrigatório!').notEmpty();

        req.checkBody('cep','CEP é um campo obrigatório!').notEmpty();
        req.checkBody('logradouro','Logradouro é um campo obrigatório!').notEmpty();
        req.checkBody('number','Número é um campo obrigatório!').notEmpty();
        req.checkBody('city','Cidade é um campo obrigatório!').notEmpty();
        req.checkBody('state','Estado é um campo obrigatório!').notEmpty();

        var errors = new Array();

        if(req.validationErrors()){
            errors = req.validationErrors();
        }

        //Validar CPF
        var cpfstr = CPF.replace(/[^0-9]/g,"");
        console.log(cpfstr);
        if(!(formValidator.testaCPF(cpfstr))){
            errors.push({
                msg: "CPF inválido!"
            });
        }

        if(errors.length > 0){
            res.render("empresas/cadastro/parte1/new",{errors: errors});
        } else {
            var newEmpresa = new Empresa({
                pessoaFisica: {
                    nome: name,
                    dataNasc: birthday,
                    CPF: CPF,
                    RG: RG,
                    orgaoEmissor: orgaoEmissor,
                    cidadeNatal: cidadeNatal,
                    telefone: phone,
                    celular: cellphone,
                    politicamenteExp: politicamenteExp,
                    aluguel: aluguel,
                    renda: renda,
                    patrimonio: patrimonio,
                    cep: cep,
                    logradouro: logradouro,
                    numero: number,
                    complemento: complement,
                    cidade: city,
                    estado: state,
                    isComplete: true
                },
                status: "Incompleto",
                user: req.user._id
            });

            Empresa.createEmpresa(newEmpresa, function(err, empresa){
                if(err) {
                    console.log(err);
                } else {
                    console.log(empresa);
                    fs.mkdir("tmp/empresas/"+req.user._id, function(err){
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("Directory created!");
                            res.redirect("/dashboard/cadastro-empresa?parte=2");
                        }
                    });
                }
            });
        }
    }

    else if(req.body.parte == 2) {
        var papel = req.body.papel;
        var CNPJ = req.body.cnpj;
        var nomeFantasia = req.body.nomeFantasia;
        var simplesNacional = req.body.simplesNacional;
        var inscricaoEstadual = req.body.inscricaoEstadual;
        var funcionarios = req.body.funcionarios;
        var telefone = req.body.telefone;
        var telefone2 = req.body.telefone2;
        var site = req.body.site;
        var facebook = req.body.facebook;
        var linkedin = req.body.linkedin;
        var outraRede = req.body.outraRede;
        var cep = req.body.cep;
        var logradouro = req.body.logradouro;
        var numero = req.body.number;
        var complemento = req.body.complement;
        var cidade = req.body.city;
        var estado = req.body.state;
        var dadosSocios = {
            numeroSocios: req.body.numeroSocios,
            nomes: req.body.nomeSoc,
            emails: req.body.emailSoc,
            celulares: req.body.celularSoc
        }

        req.checkBody("cnpj","CNPJ é um campo obrigatório!").notEmpty();
        req.checkBody("nomeFantasia","Nome fantasia da sua empresa é um campo obrigatório!").notEmpty();
        req.checkBody("funcionarios","Número de funcionários é um campo obrigatório!").notEmpty();
        req.checkBody("telefone","Telefone é um campo obrigatório!").notEmpty();
        req.checkBody("cep","CEP é um campo obrigatório!").notEmpty();
        req.checkBody("logradouro","Logradouro é um campo obrigatório!").notEmpty();
        req.checkBody("number","Número é um campo obrigatório!").notEmpty();
        req.checkBody("city","Cidade é um campo obrigatório!").notEmpty();
        req.checkBody("state","Estado é um campo obrigatório!").notEmpty();

        var errors = req.validationErrors();

        if(errors.length > 0) {
            res.render("empresas/cadastro/parte2/new", {errors: errors});
        } else {
            var pessoaJuridica = {
                papel: papel,
                CNPJ: CNPJ,
                nomeFantasia: nomeFantasia,
                simplesNacional: simplesNacional,
                inscricaoEstadual: inscricaoEstadual,
                funcionarios: funcionarios,
                telefone: telefone,
                telefone2: telefone2,
                site: site,
                facebook: facebook,
                linkedin: linkedin,
                outraRede: outraRede,
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                cidade: cidade,
                estado: estado,
                dadosSocios: dadosSocios,
                isComplete: true
            }

            var query = {user: req.user._id};

            Empresa.findOneAndUpdate(query, { $set: {pessoaJuridica: pessoaJuridica}}, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Parte 2 completa!");
                    res.redirect("/dashboard/cadastro-empresa?parte=3");
                }
            });
        }

    }

    else if(req.body.parte == 3) {
        var contatos = {
            contador: {
                nome: req.body.nomeContador,
                email: req.body.emailContador,
                telefone: req.body.telefoneContador
            },
            aluguel: {
                valor: req.body.valAluguel,
                nome: req.body.nomeLocador,
                email: req.body.emailLocador,
                telefone: req.body.telefoneLocador
            }
        };

        var fluxo = {
            faturamento: req.body.faturamento,
            lucro: req.body.lucro
        };

        var outrosEmprestimos = {
            valorParcela: req.body.valorParcela,
            dataParcela: req.body.dataParcela,
            taxaJuros: req.body.taxaJuros
        };

        var outrosGastos = {
            numeroGastos: req.body.numeroGastos,
            valor: req.body.valorGasto,
            finalidade: req.body.finalidadeGasto
        };

        req.checkBody("faturamento","Faturamento é um campo obrigatório").notEmpty();
        req.checkBody("lucro","Lucro é um campo obrigatório").notEmpty();

        var errors = req.validationErrors();

        if(errors) {
            res.render("empresas/cadastro/parte3/new", {errors: errors});
        } else {
            var dadosFinanceiros = {
                contatos: contatos,
                fluxo: fluxo,
                outrosEmprestimos: outrosEmprestimos,
                outrosGastos: outrosGastos,
                isComplete: true
            }

            var query = {user: req.user._id};

            Empresa.findOneAndUpdate(query, { $set: {dadosFinanceiros: dadosFinanceiros}}, function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Parte 3 completa!");

                    res.redirect("/dashboard/cadastro-empresa?parte=anexos");
                }
            })
        }
    }

    else if(req.body.parte == "anexos") {
        var imagensObrig = [req.files.rg,req.files.residencia,req.files.contratoSocial];
        var images = [req.files.rg, req.files.rgverso, req.files.residencia, req.files.contratoSocial, req.files.extratoCompleto, req.files.extrato1, req.files.extrato2, req.files.extrato3, req.files.extrato4];
        var errors = new Array();

        imagensObrig.every(function(img){
          if(img.size == 0) {
            errors.push({
              msg: "Os documentos RG, comprovante de residência e contrato social são obrigatórios!"
            });
            return false;
          }
        });

        if(errors.length > 0) {
            res.render("empresas/cadastro/anexos/new", {errors: errors});
        } else {
            var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
            Empresa.findOneAndUpdate(query, { $set: {anexos: {
                pessoaFisica: {
                    rg: req.files.rg.name,
                    rgverso: req.files.rgverso.name,
                    residencia: req.files.residencia.name,
                },
                empresa: {
                    contratoSocial: req.files.contratoSocial.name
                },
                banco: {
                    extratoCompleto: req.files.extratoCompleto.name,
                    extrato1: req.files.extrato1.name,
                    extrato2: req.files.extrato2.name,
                    extrato3: req.files.extrato3.name,
                    extrato4: req.files.extrato4.name
                },
                isComplete: true
            }, status: "Análise"}}, function(err){
                if(err) {
                    console.log(err);
                } else {
                    images.forEach(function(img){
                        if(img.size > 0){
                            fs.readFile(img.path, function(err, data){
                                if(err) {
                                    console.log(err);
                                } else {
                                    var imageName = img.name;
                                    fs.writeFile("tmp/empresas/"+req.user._id+"/"+imageName, data, function(err){
                                        if(err) {
                                            console.log(err);
                                        } else {
                                            console.log("Image saved!");
                                        }
                                    })
                                }
                            });
                        }
                    });
                    req.flash("success_msg","O cadastro da sua empresa está completo, agora resta nossa equipe realizar a análise!");
                    res.redirect("/dashboard/propostas");
                }
            });

        }
    }
});

// EDIT EMPRESA
router.get("/edit", middleware.isLoggedIn, function(req, res){
  var parte = 1;
  if(typeof(req.query.parte) != "undefined") {
     parte = req.query.parte;
  }

  if(parte == 1) {
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOne(query, function(err, empresa){
          if(err) {
              console.log(err);
          } else {
              if(!empresa) {
                  res.redirect("/dashboard/cadastro-empresa");
              } else {
                  res.render("empresas/cadastro/parte1/edit", {pessoaFisica: empresa.pessoaFisica});
              }
          }
      })
  }

  else if(parte == 2) {
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOne(query, function(err, empresa){
          if(err) {
              console.log(err);
          } else {
              if(!empresa){
                  res.redirect("/dashboard/cadastro-empresa");
              } else {
                  res.render("empresas/cadastro/parte2/edit", {pessoaJuridica: empresa.pessoaJuridica});
              }
          }
      });
  }

  else if(parte == 3) {
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOne(query, function(err, empresa){
          if(err) {
              console.log(err);
          } else {
              if(empresa == null) {
                  res.redirect("/dashboard/cadastro-empresa");
              } else {
                  res.render("empresas/cadastro/parte3/edit", {dadosFinanceiros: empresa.dadosFinanceiros});
              }
          }
      });
  }

  else if(parte == "anexos") {
    var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
    Empresa.findOne(query, function(err, empresa){
        if(err) {
            console.log(err);
        } else {
            if(empresa == null) {
                res.redirect("/dashboard/cadastro-empresa");
            } else {
                res.render("empresas/cadastro/anexos/edit", {anexos: empresa.anexos});
            }
        }
    });
  }
});

// UPDATE EMPRESA
router.post("/edit", multipartMiddleware, middleware.isLoggedIn, function(req, res){
  if(req.body.parte == "1") {
    var name = req.body.name;
    var birthday = req.body.date;
    var CPF = req.body.cpf;
    var RG = req.body.rg;
    var orgaoEmissor = req.body.orgaoEmissor;
    var cidadeNatal = req.body.cidadeNatal;
    var phone = req.body.telephone;
    var cellphone = req.body.cellphone;
    var politicamenteExp = req.body.politicamenteExposta;
    var aluguel = req.body.aluguel;
    var renda = req.body.renda;
    var patrimonio = req.body.patrimonio;

    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var number = req.body.number;
    var complement = req.body.complement;
    var city = req.body.city;
    var state = req.body.state;


    req.checkBody('name','Nome é um campo obrigatório!').notEmpty();
    req.checkBody('date','Data de nascimento é um campo obrigatório!').notEmpty();
    req.checkBody('cpf','CPF é um campo obrigatório!').notEmpty();
    req.checkBody('rg','RG é um campo obrigatório!').notEmpty();
    req.checkBody('orgaoEmissor','Órgão emissor é um campo obrigatório!').notEmpty();
    req.checkBody('cidadeNatal','Cidade natal é um campo obrigatório!').notEmpty();
    req.checkBody('telephone','Telefone fixo é um campo obrigatório!').notEmpty();
    req.checkBody('cellphone','Celular é um campo obrigatório!').notEmpty();
    req.checkBody('renda','Renda Mensal Declarada é um campo obrigatório!').notEmpty();
    req.checkBody('patrimonio','Patrimônio é um campo obrigatório!').notEmpty();

    req.checkBody('cep','CEP é um campo obrigatório!').notEmpty();
    req.checkBody('logradouro','Logradouro é um campo obrigatório!').notEmpty();
    req.checkBody('number','Número é um campo obrigatório!').notEmpty();
    req.checkBody('city','Cidade é um campo obrigatório!').notEmpty();
    req.checkBody('state','Estado é um campo obrigatório!').notEmpty();

    var errors = new Array();

    if(req.validationErrors()){
        errors = req.validationErrors();
    }

    //Validar CPF
    var cpfstr = CPF.replace(/[^0-9]/g,"");
    console.log(cpfstr);
    if(!(formValidator.testaCPF(cpfstr))){
        errors.push({
            msg: "CPF inválido!"
        });
    }

    if(errors.length > 0) {
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOne(query, function(err, empresa){
        if(err) {
          console.log(err);
        } else {
          res.render("empresas/cadastro/parte1/edit", {errors: errors, pessoaFisica: empresa.pessoaFisica});
        }
      });
    } else {
      var pessoaFisica = {
        nome: name,
        dataNasc: birthday,
        CPF: CPF,
        RG: RG,
        orgaoEmissor: orgaoEmissor,
        cidadeNatal: cidadeNatal,
        telefone: phone,
        celular: cellphone,
        politicamenteExp: politicamenteExp,
        aluguel: aluguel,
        renda: renda,
        patrimonio: patrimonio,
        cep: cep,
        logradouro: logradouro,
        numero: number,
        complemento: complement,
        cidade: city,
        estado: state,
        isComplete: true
      }

      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};

      Empresa.findOneAndUpdate(query, { $set: {pessoaFisica: pessoaFisica}}, function(err){
        if(err) {
          console.log(err);
        } else {
          console.log("Parte 1 atualizada!");
          res.redirect("/dashboard/cadastro-empresa/edit?parte=2");
        }
      })
    }

  }

  else if(req.body.parte == 2) {
      var papel = req.body.papel;
      var CNPJ = req.body.cnpj;
      var nomeFantasia = req.body.nomeFantasia;
      var simplesNacional = req.body.simplesNacional;
      var inscricaoEstadual = req.body.inscricaoEstadual;
      var funcionarios = req.body.funcionarios;
      var telefone = req.body.telefone;
      var telefone2 = req.body.telefone2;
      var site = req.body.site;
      var facebook = req.body.facebook;
      var linkedin = req.body.linkedin;
      var outraRede = req.body.outraRede;
      var cep = req.body.cep;
      var logradouro = req.body.logradouro;
      var numero = req.body.number;
      var complemento = req.body.complement;
      var cidade = req.body.city;
      var estado = req.body.state;
      var dadosSocios = {
          numeroSocios: req.body.numeroSocios,
          nomes: req.body.nomeSoc,
          emails: req.body.emailSoc,
          celulares: req.body.celularSoc
      }

      req.checkBody("cnpj","CNPJ é um campo obrigatório!").notEmpty();
      req.checkBody("nomeFantasia","Nome fantasia da sua empresa é um campo obrigatório!").notEmpty();
      req.checkBody("funcionarios","Número de funcionários é um campo obrigatório!").notEmpty();
      req.checkBody("telefone","Telefone é um campo obrigatório!").notEmpty();
      req.checkBody("cep","CEP é um campo obrigatório!").notEmpty();
      req.checkBody("logradouro","Logradouro é um campo obrigatório!").notEmpty();
      req.checkBody("number","Número é um campo obrigatório!").notEmpty();
      req.checkBody("city","Cidade é um campo obrigatório!").notEmpty();
      req.checkBody("state","Estado é um campo obrigatório!").notEmpty();

      var errors = req.validationErrors();

      if(errors.length > 0) {
          var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
          Empresa.findOne(query, function(err, empresa){
            if(err) {
              console.log(err);
            } else {
              res.render("empresas/cadastro/parte2/edit",{errors: errors, pessoaJuridica: empresa.pessoaJuridica});
            }
          })
      } else {
          var pessoaJuridica = {
              papel: papel,
              CNPJ: CNPJ,
              nomeFantasia: nomeFantasia,
              simplesNacional: simplesNacional,
              inscricaoEstadual: inscricaoEstadual,
              funcionarios: funcionarios,
              telefone: telefone,
              telefone2: telefone2,
              site: site,
              facebook: facebook,
              linkedin: linkedin,
              outraRede: outraRede,
              cep: cep,
              logradouro: logradouro,
              numero: numero,
              complemento: complemento,
              cidade: cidade,
              estado: estado,
              dadosSocios: dadosSocios,
              isComplete: true
          }

          var query = {user: req.user._id};

          Empresa.findOneAndUpdate(query, { $set: {pessoaJuridica: pessoaJuridica}}, function(err){
              if(err){
                  console.log(err);
              } else {
                  console.log("Parte 2 atualizada!");
                  res.redirect("/dashboard/cadastro-empresa/edit?parte=3");
              }
          });
      }

  }

  else if(req.body.parte == 3) {
      var contatos = {
          contador: {
              nome: req.body.nomeContador,
              email: req.body.emailContador,
              telefone: req.body.telefoneContador
          },
          aluguel: {
              valor: req.body.valAluguel,
              nome: req.body.nomeLocador,
              email: req.body.emailLocador,
              telefone: req.body.telefoneLocador
          }
      };

      var fluxo = {
          faturamento: req.body.faturamento,
          lucro: req.body.lucro
      };

      var outrosEmprestimos = {
          valorParcela: req.body.valorParcela,
          dataParcela: req.body.dataParcela,
          taxaJuros: req.body.taxaJuros
      };

      var outrosGastos = {
          numeroGastos: req.body.numeroGastos,
          valor: req.body.valorGasto,
          finalidade: req.body.finalidadeGasto
      };

      req.checkBody("faturamento","Faturamento é um campo obrigatório").notEmpty();
      req.checkBody("lucro","Lucro é um campo obrigatório").notEmpty();

      var errors = req.validationErrors();

      if(errors) {
          var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
          Empresa.findOne(query, function(err, empresa){
            if(err) {
              console.log(err);
            } else {
              res.render("empresas/cadastro/parte3/edit", {errors: errors, dadosFinanceiros: empresa.dadosFinanceiros});
            }
          })

      } else {
          var dadosFinanceiros = {
              contatos: contatos,
              fluxo: fluxo,
              outrosEmprestimos: outrosEmprestimos,
              outrosGastos: outrosGastos,
              isComplete: true
          }

          var query = {user: req.user._id};

          Empresa.findOneAndUpdate(query, { $set: {dadosFinanceiros: dadosFinanceiros}}, function(err){
              if(err) {
                  console.log(err);
              } else {
                  console.log("Parte 3 atualizada!");

                  res.redirect("/dashboard/cadastro-empresa/edit?parte=anexos");
              }
          })
      }
  }

  else if(req.body.parte == "anexos") {
      var images = [req.files.rg, req.files.rgverso, req.files.residencia, req.files.contratoSocial, req.files.extratoCompleto, req.files.extrato1, req.files.extrato2, req.files.extrato3, req.files.extrato4];
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOneAndUpdate(query, { $set: {anexos: {
          pessoaFisica: {
              rg: req.files.rg.name,
              rgverso: req.files.rgverso.name,
              residencia: req.files.residencia.name,
          },
          empresa: {
              contratoSocial: req.files.contratoSocial.name
          },
          banco: {
              extratoCompleto: req.files.extratoCompleto.name,
              extrato1: req.files.extrato1.name,
              extrato2: req.files.extrato2.name,
              extrato3: req.files.extrato3.name,
              extrato4: req.files.extrato4.name
          },
          isComplete: true
      }, status: "Análise"}}, function(err){
          if(err) {
              console.log(err);
          } else {
              images.forEach(function(img){
                  if(img.size > 0){
                      fs.readFile(img.path, function(err, data){
                          if(err) {
                              console.log(err);
                          } else {
                              var imageName = img.name;
                              fs.writeFile("tmp/empresas/"+req.user._id+"/"+imageName, data, function(err){
                                  if(err) {
                                      console.log(err);
                                  } else {
                                      console.log("Image saved!");
                                  }
                              })
                          }
                      });
                  }
              });
              req.flash("success_msg","O cadastro da sua empresa foi atualizado!");
              res.redirect("/dashboard/propostas");
          }
      });
  }
});

module.exports = router;
