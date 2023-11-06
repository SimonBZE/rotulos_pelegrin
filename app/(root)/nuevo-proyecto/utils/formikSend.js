export const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      
      setLoadingForm(true);
      // console.log(formData);
      // Ahora envía el formulario completo a tu API

      // Asignar a departamento
      const departamentos = [
        "diseno",
        "impresion",
        "corte",
        "cerrajeria",
        "pintura",
        "montaje",
      ];

      const asignarDepartamento = (formData) => {
        formData.departamento = "";
        for (const departamento of departamentos) {
          if (formData[departamento]?.length > 0) {
            formData.departamento = departamento;
            break;
          }
        }
        if(formData.departamento === "") notify("Debe de agregar al menos un departamento", "error")
      };

      asignarDepartamento(formData);
      // Fin
      formData.creador = user.username;
      formData.idpresupuesto = presupuesto;

      formData.diseno.forEach((item, index) => {
        item.imagenes = images.diseno?.[index] || [];
      });

      formData.impresion.forEach((item, index) => {
        item.imagenes = images.impresion?.[index] || [];
      });

      formData.corte.forEach((item, index) => {
        item.imagenes = images.corte?.[index] || [];
      });

      formData.cerrajeria.forEach((item, index) => {
        item.imagenes = images.cerrajeria?.[index] || [];
      });

      formData.pintura.forEach((item, index) => {
        item.imagenes = images.pintura?.[index] || [];
      });

      formData.montaje.forEach((item, index) => {
        item.imagenes = images.montaje?.[index] || [];
      });

      if (files.videos) {
        formData.videos = [].concat(...files.videos);
      }

      if (files.audios) {
        formData.audios = [].concat(...files.audios);
      }

      if (files.fotos) {
        formData.fotos = [].concat(...files.fotos);
      }

      try {
        const res = await budgetCtrl.createBudget(formData);
        setLoadingForm(false);

        if(!!res.error) throw res

        notify("Proyecto creado con exito", "success");
        router.push('/proyectos')
        
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
        
        // Muestra un mensaje de error usando Toastify
        notify("No se ha enviado el formulario", "error");

      }
    },
  });