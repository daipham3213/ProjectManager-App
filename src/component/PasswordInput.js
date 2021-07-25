import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Typography
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import clsx from "clsx";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
}));


const PasswordInput = ({
                           handleChange,
                           title,
                           id = "outlined-adornment-password",
                           value = "",
                           fullWidth = false,
                           style = {},
                           helperText ="",
                           required = false,
                       }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    if (fullWidth) style = {...style, width: "100%"}
    if (required && helperText==="") helperText="This field is required."
    return (
        <FormControl className={clsx(classes.margin)} variant="outlined" style={style}>
            <InputLabel htmlFor={id}>{title}</InputLabel>
            <OutlinedInput
                id={id}
                type={values.showPassword ? 'text' : 'password'}
                value={value}
                onChange={handleChange}
                fullWidth
                required={required}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
            />
            {helperText!=="" ? (
                <Typography variant={"caption"}>{helperText}</Typography>
            ):null}
        </FormControl>
    )
}
export default PasswordInput;